import { useRouteError, Link, useNavigation } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import "./Error.scss";

export function Error() {
  const err = useRouteError();
  const errMsg = err.data;

  const navigation = useNavigation();

  return navigation.state === "loading" ? (
    <Loading />
  ) : (
    <div className="err-wrapper">
      <h1>{errMsg || "Page not found"}</h1>
      <Link to="/">Return to Home Page</Link>
    </div>
  );
}
