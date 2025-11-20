
export default function Navbar() {
    return (
        <nav className="flex items-center justify-between py-4">
            <div className="flex items-center">
            
                <h1 className="ml-2 text-2xl font-bold">My Portfolio</h1>
            </div>
            <ul className="flex space-x-4">
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}