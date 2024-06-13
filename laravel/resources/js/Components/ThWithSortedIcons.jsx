import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { router } from "@inertiajs/react";

export default function ThWithSortedIcons({
    sortable = true,
    htmlName,
    queryName = htmlName,
    queryParams = null,
    className,
    url = "project.index",
}) {
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_direction === "asc"
                ? (queryParams.sort_direction = "desc")
                : (queryParams.sort_direction = "asc");
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }

        router.get(route(url, queryParams));
    };

    return (
        <th onClick={(e) => sortChanged(queryName)}>
            <div
                className={
                    sortable
                        ? "px-3 py-3 flex items-center justify-beetwen gap-1 cursor-pointer "
                        : "px-3 py-3 "
                    + className
                }
            >
                {htmlName}
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={
                                "w-4 " +
                                (queryParams.sort_field === queryName &&
                                queryParams.sort_direction === "asc"
                                    ? "text-white"
                                    : "")
                            }
                        ></ChevronUpIcon>
                        <ChevronDownIcon
                            className={
                                "w-4 -mt-2 " +
                                (queryParams.sort_field === queryName &&
                                queryParams.sort_direction === "desc"
                                    ? "text-white"
                                    : "")
                            }
                        ></ChevronDownIcon>
                    </div>
                )}
            </div>
        </th>
    );
}
