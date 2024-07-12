import { Loader2 } from "lucide-react"

const Loader = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin size-10 text-white" />
      </main>
  )
}

export default Loader