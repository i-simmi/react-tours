import { useEffect, useState } from "react";
import Tours from "./Tours";
import Loading from "./Loading";

const url = "https://www.course-api.com/react-tours-project";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const deleteTour = tours.filter((tour) => tour.id !== id);
    setTours(deleteTour);
  };

  const fetchTour = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchTour();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length == 0) {
    return (
      <div className="title">
        <h2>no tours left</h2>
        <bytton
          type="button"
          className="btn"
          style={{ marginTop: "2px" }}
          onClick={() => fetchTour()}
        >
          Refresh
        </bytton>
      </div>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
