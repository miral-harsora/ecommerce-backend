const Brand = ({ light = false }) => (
  <span className={`brand-wordmark ${light ? "text-white" : "text-sphere-plum"}`} aria-label="ShopSphere home">
    Shop<span className={light ? "text-[#ffb6a4]" : "text-sphere-rose"}>Sphere</span>
  </span>
);

export default Brand;
