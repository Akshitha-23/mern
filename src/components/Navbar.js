import { Link,  useLocation } from "react-router-dom"
import './Navbar.css'


export default function Navbar() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const rollnumber = params.get('roll');

  return (
    <nav className="nav">

      <ul>
        <CustomLink to={`/sem1-chart?roll=${rollnumber}`}>SEM-1</CustomLink>
        <CustomLink to={`/sem2-chart?roll=${rollnumber}`}>SEM-2</CustomLink>
        <CustomLink to={`/sem3-chart?roll=${rollnumber}`}>SEM-3</CustomLink>
        <CustomLink to={`/sem4-chart?roll=${rollnumber}`}>SEM-4</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const toPathWithoutParams = to.split('?')[0];
  
  const isActive = currentPath === toPathWithoutParams;
  

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}