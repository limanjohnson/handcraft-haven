import Link from "next/link";
import Image from "next/image";

function Main({ children, className }: { children: React.ReactNode; className?: string }) {
    return <main className={className}>{children}</main>;
}

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Main className="flex-1 w-full">
                {/* Hero Section */}
                <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/hero-image.jpg"
                            alt="Handcrafted products"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/40 z-10"></div>
                    </div>

                    {/* Content on top of image */}
                    <div className="relative z-20 max-w-3xl px-6 text-center text-white">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-[2px_2px_8px_rgba(0,0,0,0.8)]">
                            Discover Unique Handcrafted Treasures
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed mb-8 drop-shadow-[1px_1px_6px_rgba(0,0,0,0.8)]">
                            Connect with talented artisans and find one-of-a-kind pieces that tell a story.
                            From handmade jewelry to custom furniture, every item is crafted with passion.
                        </p>

                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link
                                href="/products"
                                className="inline-block px-8 py-3 rounded-lg font-semibold border-2 bg-[#8B6F47] border-[#8B6F47] text-white transition-all duration-300 hover:bg-[#5C4A3A] hover:border-[#5C4A3A] hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                Explore Products
                            </Link>
                            <Link
                                href="/artisans"
                                className="inline-block px-8 py-3 rounded-lg font-semibold border-2 border-white text-white transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5"
                            >
                                Meet Artisans
                            </Link>
                        </div>
                    </div>
                </section>
            </Main>
        </div>
    );
}
