import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <nav className="text-center mt-4">
            {links.map(link => (
                <Link
                // preserveScroll = faz com que ele não volte pro topo da pagina ao ir no link.
                key={link.label}
                href={link.url || ""}
                className=
                {
                    "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs "
                    + (link.active ? "bg-gray-950" : " ")
                    + (!link.url ? "!text-gray-500 cursor-not-allowed " : "hover:bg-gray-950 ")
                }
                dangerouslySetInnerHTML={{ __html: link.label }}>
                </Link>
            ))}
        </nav>
    );
}
