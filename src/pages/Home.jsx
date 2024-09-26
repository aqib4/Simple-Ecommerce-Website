import ProductsList from "../components/ProductsList";
const Home = () => {
  return (
    <>
      <div className="container mx-auto flex items-center justify-around py-16 hero">
        <div className="hero-content">
          <p>
            <em>Looking To Naurish your Face Or Intersted in mackeup?</em>
          </p>
          <h1 className="text-3xl md:text-6xl font-bold">Don't Wait</h1>
          <button className="px-6 py-2 rounded-full text-white font-bold mt-4 bg-pink-400 hover:bg-pink-500">
            Order Now
          </button>
        </div>
        <div className="hero-img">
          <img className="w-4/5" src="/img/hero.png" alt="" />
        </div>
      </div>

      <div className="py-24">
        <ProductsList />
      </div>
    </>
  );
};

export default Home;
