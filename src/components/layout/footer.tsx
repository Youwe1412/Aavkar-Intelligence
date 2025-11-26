import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-midnight border-t border-white/5 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-electric-teal to-blue-violet" />
                        <span className="text-lg font-serif font-bold text-white">
                            Aavkar Intelligence
                        </span>
                    </div>

                    <div className="flex items-center gap-8 text-sm text-slate-400">
                        <Link href="#" className="hover:text-white transition-colors">Aavkar Productions</Link>
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                        <Link href="#" className="hover:text-white transition-colors">Email</Link>
                    </div>

                    <div className="text-sm text-slate-600">
                        © {new Date().getFullYear()} Aavkar Productions.
                    </div>
                </div>
            </div>
        </footer>
    );
}
