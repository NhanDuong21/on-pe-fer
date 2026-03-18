import { useEffect, useState } from "react";

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await fetch("http://localhost:5000/home");
        const data = await response.json();
        setHomeData(data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  if (loading) {
    return <p>Loading home page...</p>;
  }

  if (!homeData) {
    return <p>Cannot load home data.</p>;
  }

  return (
    <div className="home-page">
      <h1 className="mb-3">{homeData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: homeData.content }} />
    </div>
  );
}

export default Home;
