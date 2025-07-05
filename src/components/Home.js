import HeroCarousel from './Carosuel';
import Regions from './Regions';
import Recommendations from './Recommendations';
import Imgdiv from './img-div';
import TestimonialsCarousel from './Testmonial';
import GoogleMapComp from "./Map";
export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Regions />
      <GoogleMapComp/>
      <Recommendations />
      <Imgdiv />
      <TestimonialsCarousel/>
    </>
  );
}
