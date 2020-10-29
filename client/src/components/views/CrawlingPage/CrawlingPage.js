import React, { useEffect, useState } from "react";
import axios from "axios";

function CrawlingPage() {
    const [data, setData] = useState(null);
    useEffect(() => {
      const getData = async () => {
        const datas = await axios.get("/api/research/crawling");
        setData(datas.data);
      };
      getData();
    }, []);

    useEffect(() => {
      console.log(data);
    }, [data]);

    if (data === null) {
      return <div>Load..</div>;
    } else {
      return (
        <div>
          {data.map((ele, idx) => (
            <div key={idx}>
              <div>
                <img src="{ele.image}" alt="thumbnail" />
                <p>
                  {ele.title}
                </p>
              </div>
              <br />
            </div>
          ))}
        </div>
      );
    }
}

export default CrawlingPage
