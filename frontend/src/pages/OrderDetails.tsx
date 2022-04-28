import {
  ArrowRightAlt,
  AssignmentReturnedOutlined,
  CheckCircleOutline,
  LocalShipping,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IRootState } from "../redux/Reducers/rootReducer";
import { Order } from "../type";
import { io, Socket } from "socket.io-client";
import SyncLoader from "react-spinners/SyncLoader";

const OrderDetail = () => {
  const { user } = useSelector((state: IRootState) => ({ user: state.auth }));

  const { id } = useParams();
  const navigate = useNavigate();
  const [deliver, setDeliver] = useState<Array<Boolean>>([]);
  const [data, setData] = useState<Order>();
  const [prep, setPrep] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const [cargo, setCargo] = useState<string>();
  const socket = useRef<Socket>();

  const getOrder = async () => {
    if (user.user.id !== "") {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/api/orders/myorders/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    getOrder();
  }, [user.user.id, deliver, prep, cargo]);

  const handleClick = async (index: number) => {
    await axios
      .post(
        "http://localhost:5000/api/orders/myorders/changeDelivered",
        { orderId: id, index: index },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setDeliver(res.data.delivered);
      });
  };

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    if (socket.current && user.user.id !== "") {
      socket?.current.on("changes", (data) => {
        if (id === data.orderId) {
          setPrep(data.prepared);
          setCargo(data.cargotracknumber);
        }
      });
    }
  }, [user.user]);

  return (
    <div>
      {!loading ? (
        <Box sx={{ padding: "1em", width: "100vh" }}>
          <h3>Order - {id}</h3>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {data?.order.map((crt: any, index: number) => (
                <Card
                  key={crt._id}
                  sx={{ marginBottom: "5px", padding: "3px" }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 2fr 1fr 1fr",
                      justifyItems: "center",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={crt.img[0]}
                      alt="Live from space album cover"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifySelf: "start",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5">
                          {crt.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {crt._id}
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignSelf: "center",
                      }}
                    >
                      <Typography component="div" variant="h6">
                        {data?.amount[index]} piece
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignSelf: "center",
                      }}
                    >
                      <Typography component="div" variant="h4">
                        ₺{crt.cost * data?.amount[index]}
                      </Typography>
                    </Box>
                  </div>

                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        marginBottom: "5px",
                      }}
                    >
                      <Card
                        sx={
                          data.preparing[index]
                            ? {
                                backgroundColor: "#F4EEA9",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "5px",
                              }
                            : {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "5px",
                              }
                        }
                      >
                        <CheckCircleOutline
                          sx={
                            data.preparing[index]
                              ? { color: "green" }
                              : { color: "lightgray" }
                          }
                        />
                        <h5
                          style={
                            data.preparing[index]
                              ? { color: "green", margin: "0px" }
                              : { color: "lightgray", margin: "0px" }
                          }
                        >
                          Preparing...
                        </h5>
                        <h6 style={{ margin: "5px", color: "green" }}>
                          {data.preparedAt[index] !== "now"
                            ? moment(data.preparedAt[index]).format("LLL")
                            : null}
                        </h6>
                      </Card>
                      <ArrowRightAlt
                        fontSize="large"
                        sx={
                          data.delivered[index]
                            ? {
                                color: "green",
                              }
                            : {
                                color: "lightgray",
                              }
                        }
                      />
                      <Card
                        sx={
                          data.sentbycargo[index]
                            ? {
                                backgroundColor: "#F4EEA9",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "5px",
                              }
                            : {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "5px",
                              }
                        }
                      >
                        <LocalShipping
                          sx={
                            data.sentbycargo[index]
                              ? { color: "green" }
                              : { color: "lightgray" }
                          }
                        />
                        <h5
                          style={
                            data.sentbycargo[index]
                              ? { color: "green", margin: "0px" }
                              : { color: "lightgray", margin: "0px" }
                          }
                        >
                          Sent by cargo
                        </h5>
                        <h6 style={{ margin: "5px", color: "green" }}>
                          {data.sentAt[index] !== "now"
                            ? moment(data.sentAt[index]).format("LLL")
                            : null}
                        </h6>
                        <h6 style={{ margin: "5px", color: "green" }}>
                          {data.cargoTrackNumber[index] !== ""
                            ? `Track No : ${data.cargoTrackNumber[index]}`
                            : null}
                        </h6>
                      </Card>
                      <ArrowRightAlt
                        fontSize="large"
                        sx={
                          data.delivered[index]
                            ? {
                                color: "green",
                              }
                            : {
                                color: "lightgray",
                              }
                        }
                      />

                      <Card
                        sx={
                          data.delivered[index]
                            ? {
                                backgroundColor: "#F4EEA9",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "5px",
                              }
                            : {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "5px",
                              }
                        }
                      >
                        <AssignmentReturnedOutlined
                          sx={
                            data.delivered[index]
                              ? { color: "green" }
                              : { color: "lightgray" }
                          }
                        />
                        <h5
                          style={
                            data.delivered[index]
                              ? { color: "green", margin: "0px" }
                              : { color: "lightgray", margin: "0px" }
                          }
                        >
                          Confirm When you received.
                        </h5>
                        <h6 style={{ margin: "5px", color: "green" }}>
                          {data.deliveredAt[index] !== "now"
                            ? moment(data.deliveredAt[index]).format("LLL")
                            : null}
                        </h6>
                      </Card>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                      <Button
                        disabled={
                          (data.preparing[index] || data.sentbycargo[index]) &&
                          !data.delivered[index]
                            ? false
                            : true
                        }
                        color="success"
                        size="small"
                        onClick={() => handleClick(index)}
                      >
                        Yes, I received.
                      </Button>
                      <Button
                        color="warning"
                        style={data.delivered[index] ? {} : { display: "none" }}
                        onClick={() => navigate(`/details/${crt._id}`)}
                      >
                        Leave me a comment
                      </Button>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <SyncLoader size={20} margin={2} color="#c67c03" />
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
