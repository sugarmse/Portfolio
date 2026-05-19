import './App.css';
import Header    from './components/header/Header';
import Hero      from './components/Hero';
import About     from './components/About';
import Timeline  from './components/Timeline';
import Skills    from './components/Skills';
import Equipment from './components/Equipment';
import Projects  from './components/Projects';
import Contact   from './components/Contact';
import Footer    from './components/footer/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Equipment />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
