import { Outlet, useOutletContext } from "react-router";


export default function () {
  const context = useOutletContext();

  return (
    <div className="w-screen h-screen grid place-items-center">
      <Outlet context={context} />
    </div>
  );
}
