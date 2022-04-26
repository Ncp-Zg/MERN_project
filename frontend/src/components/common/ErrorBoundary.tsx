import { FunctionComponent } from "react";


interface ErrorProps {
    error:any;
    resetErrorBoundary:any;
  }

const ErrorFallback: FunctionComponent<ErrorProps>=({error, resetErrorBoundary})=> {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default ErrorFallback