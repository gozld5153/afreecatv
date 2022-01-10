import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import TopWrap from "./components/TopWrap";
import BoardList from "./components/BoardList";

function App() {
  const footer = useRef();
  const [broadList, setBroadList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState("최신순");
  let page = 1;

  const handleAfresh = () => {
    setLoading(true);
    axios({
      url: `/broad/list?client_id=e8201566692601ecee34820c9862e516&${
        change === "최신순" ? "order_type=board_start&" : null
      }page_no=1`,
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
      },
    })
      .then((data) => {
        setBroadList(data.data.broad);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => console.log(err.response));
  };

  const handleSortList = (value) => {
    setChange(value);
  };

  useEffect(() => {
    setLoading(true);
    axios({
      url: `/broad/list?client_id=e8201566692601ecee34820c9862e516&${
        change === "최신순" ? "order_type=board_start&" : null
      }page_no=1`,
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
      },
    })
      .then((data) => {
        setBroadList(data.data.broad);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => console.log(err.response));
  }, [change]);

  const handleScroll = (entry) => {
    if (entry[0].isIntersecting) {
      page++;
      axios({
        url: `/broad/list?client_id=e8201566692601ecee34820c9862e516&${
          change === "최신순" ? "order_type=board_start&" : null
        }page_no=${page}`,
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "*/*",
        },
      })
        .then((data) => {
          setBroadList(broadList.concat(data.data.broad));
        })
        .catch((err) => console.log(err.response));
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    };

    let observer;
    const fetchElement = footer.current;
    if (fetchElement) {
      observer = new IntersectionObserver(handleScroll, options);
      observer.observe(fetchElement);
    }
    return () => {
      if (fetchElement) observer.disconnect(fetchElement);
    };
  }, [handleScroll]);

  if (loading)
    return (
      <div id="containter">
        <div id="loading"></div>
      </div>
    );

  return (
    <div className="wrap_main_list">
      <TopWrap
        handleSortList={handleSortList}
        handleAfresh={handleAfresh}
        change={change}
      />
      <div className="wrap_b_list">
        <ul>
          {broadList.map((list, idx) => (
            <BoardList key={idx} list={list} />
          ))}
        </ul>
      </div>
      <div className="footer" ref={footer}></div>
    </div>
  );
}

export default App;
