import { ThemeProvider } from "next-themes";
import { MoodProvider } from "./contexts/MoodContext";
import About from "./components/About";
import Contact from "./components/Contact";
import TechStack from "./components/TechStack";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import SocialLinks from "./components/SocialLinks";
import MoodToggle from "./components/MoodToggle";
import ConfettiEffect from "./components/ConfettiEffect";
// import DebugPanel from "./components/DebugPanel";

function App() {
	return (
		<MoodProvider>
			<ThemeProvider attribute="class">
				<div>
					<ConfettiEffect />
					<Navbar />
					<Home />
					<About />
					<Portfolio />
					<TechStack />
					<Contact />
					<SocialLinks />
					<MoodToggle />
					{/* <DebugPanel /> */}
				</div>
			</ThemeProvider>
		</MoodProvider>
	);
}

export default App;
