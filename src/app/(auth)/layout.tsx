
interface Props {
  children: React.ReactNode;
}

const Layout=({children}:Props)=>{
  return(
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm md:max-w-3xl flex-col gap-6 rounded-lg bg-background p-6 shadow-md">
          {children}
      </div>
    </div>
  )
}
export default Layout;