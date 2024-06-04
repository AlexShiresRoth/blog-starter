import React from 'react';

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full flex flex-col items-center">{children}</main>;
}
