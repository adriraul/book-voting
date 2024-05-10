import { useContext } from "react";
import { BookAdd } from "../components/BookAdd";
import { BookList } from "../components/BookList";
import { SocketContext } from "../context/SocketContext";
import { BookChart } from "../components/BookChart";

function HomePage() {
  const { online } = useContext(SocketContext);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success"> Online</span>
          ) : (
            <span className="text-danger"> Offline</span>
          )}
        </p>
      </div>
      <h1>BookNames</h1>
      <div className="row">
        <div className="col">
          <BookChart />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-8">
          <BookList />
        </div>
        <div className="col-4">
          <BookAdd />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
