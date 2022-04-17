import { ReactChild, ReactNode } from "react";

export default function Widget({ children }: WidgetProps) {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="d-flex flex-column justify-content-center">
        {children}
      </div>
    </div>
  );
}

type WidgetProps = {
  children: ReactNode;
};
