import { ThemeProvider } from "next-themes";
import About from "./components/About";
import Contact from "./components/Contact";
import TechStack from "./components/TechStack";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import SocialLinks from "./components/SocialLinks";

function App() {
	return (
		<ThemeProvider attribute="class">
			<div>
				<Navbar />
				<Home />
				<About />
				<Portfolio />
				<TechStack />
				<Contact />
				<SocialLinks />
			</div>
		</ThemeProvider>
	);
}

export default App;
