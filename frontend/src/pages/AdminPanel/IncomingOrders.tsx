import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IRootState } from "../../redux/Reducers/rootReducer";
import { incomingOrders } from "../../type";
import { io, Socket } from "socket.io-client";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Orders from "../../components/Orders";
import PopupAlert from "../../components/common/PopupAlert";

const IncomingOrders = () => {
  const [data, setData] = useState<incomingOrders[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loadingPrep, setLoadingPrep] = useState<number>(-1);
  const [loadingCargo, setLoadingCargo] = useState<number>(-1);
  const [prep, setPrep] = useState<Array<boolean>>();
  const [sent, setSent] = useState<Array<boolean>>();
  const [orders, setOrders] = useState<number>(0);
  const [trackNumber, setTrackNumber] = useState<number>(0);
  const [indx, setIndex] = useState<number>(0);
  const socket = useRef<Socket>();
  const { user } = useSelector((state: IRootState) => state.auth);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const changePrep = async (index: number) => {
    if (data) {
      setLoadingPrep(index);
      setIndex(data.length - 1 - index);
      await axios
        .post(
          "http://localhost:5000/api/orders/myorders/changepreparing",
          {
            orderId: data[index].orderId,
            productId: data[index].product._id,
            index: data.length - 1 - index,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        .then((res) => {
          setPrep(res.data.preparing);
          setLoadingPrep(-1);
        })
        .catch((err) => {
          toast.warn(err.response.data.message);
          setError(true);
          setLoadingPrep(-1);
        });
    }
  };

  const changeSentByCargo = async (index: number) => {
    if (data && !isNaN(trackNumber) && trackNumber !== 0) {
      setLoadingCargo(index);
      setIndex(data.length - 1 - index);

      await axios
        .post(
          "http://localhost:5000/api/orders/myorders/changesentbycargo",
          {
            orderId: data[index].orderId,
            productId: data[index].product._id,
            trackNo: trackNumber,
            i: data.length - 1 - index,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        .then((res) => {
          setSent(res.data.sentbycargo);
          setLoadingCargo(-1);
        })
        .catch((err) => {
          toast.warn(err.response.data.message);
          setError(true);
          setLoadingCargo(-1);
        });
    } else {
      toast.warn("Please provide a valid track Number");
    }
  };


  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {

    if (socket.current && user.id !== "") {
      socket?.current.on("getUsers", (usr) => {
        if (usr.userId === user.id) {
          setOrders(usr.user.incomingOrders.length);
        }
      });
    }

  }, [user]);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit("changeState", { i: indx, userId: user.id });
    }
  }, [prep, sent]);

  useEffect(() => {
    const abortCont = new AbortController();
    
  const getIncomingOrders = async () => {
    if (user.token !== "") {
      if (!data) {
        setLoading(true);
      }
      await axios
        .get("http://localhost:5000/api/users/admin/incomingorders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          signal: abortCont.signal
    
        })
        .then((res) => {
          setData(res.data.incomingOrders.reverse());
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === "AbortError"){
            console.log("axios aborted")
          }else{
            toast.warn(err.response.data.message);
            setError(true);
            setLoading(false);

          }
        });
    }
  };
    getIncomingOrders();

    
    return () => abortCont.abort();

  }, [user.token, orders, prep, sent]);

  return (
    <div>
      {!loading && !error ? (
        data?.map((ordr, index) => (
          <Orders
            key={ordr._id}
            ordr={ordr}
            index={index}
            data={data}
            loadingCargo={loadingCargo}
            loadingPrep={loadingPrep}
            changePrep={changePrep}
            changeSentByCargo={changeSentByCargo}
            setTrackNumber={setTrackNumber}
          />
        ))
      ) : error ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <PopupAlert
            open={open}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <ClimbingBoxLoader size={30} color="#c67c03" />
        </div>
      )}
    </div>
  );
};

export default IncomingOrders;
