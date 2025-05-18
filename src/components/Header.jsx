import Logo from "../components/Logo";

function Header() {
  return (
    <header className="flex flex-col justify-center p-6">
      <Logo width={"60px"} />
    </header>
  );
}

export default Header;
