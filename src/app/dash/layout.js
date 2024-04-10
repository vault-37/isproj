import Wrapper from "./Wrapper";

export default function DashLayout({ children }) {
  return (
    <>
      <div>
        <Wrapper />
        <main>{children}</main>
      </div>
    </>
  );
}
