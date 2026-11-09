import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Experience from "../components/home/Experience";
import Skills from "../components/home/Skills";
import Projects from "../components/home/Projects";
import Journey from "../components/home/Journey";
import Achievements from "../components/home/Achievements";
import Contact from "../components/home/Contact";
import SectionDivider from "../components/common/SectionDivider";

const Home = () => {
  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Journey />
      <SectionDivider />
      <Achievements />
      <SectionDivider />
      <Contact />
    </>
  );
};

export default Home;