const Navbar = () => {
  return (
    <div className="flex justify-between border-b-2">
        <div className="text-xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text ml-32 mt-2 mb-2">Movelo</div>
        <div className="mr-24 mt-2 mb-2">
            <a href="/signin" className="text-white font-mono rounded-md border px-4 py-2 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400">Login</a>
        </div>
    </div>
  )
}

export default Navbar