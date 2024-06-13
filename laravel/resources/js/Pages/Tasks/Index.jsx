import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { MapStatusCss } from "@/cssConstants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import ThWithSortedIcons from "@/Components/ThWithSortedIcons.jsx";

export default function Index({auth, tasks, queryParams=null }) {

    queryParams = queryParams || {};

    const searchFieldChange = (name,value) => {
        if (value) {
            queryParams[name] = value;
        } else delete queryParams[name];

        router.get(route('task.index', queryParams));
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChange(name, e.target.value);
    }


    return (
        <Authenticated
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>}

        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                                    dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <ThWithSortedIcons url="task.index" sortable={false} htmlName="image"/>
                                            <ThWithSortedIcons url="task.index" htmlName="name" queryParams={queryParams}/>
                                            <ThWithSortedIcons url="task.index" htmlName="description" queryParams={queryParams}/>
                                            <ThWithSortedIcons url="task.index" htmlName="create date" queryName="created_at" queryParams={queryParams}/>
                                            <ThWithSortedIcons url="task.index" htmlName="due date" queryName="due_date" queryParams={queryParams}/>
                                            <ThWithSortedIcons url="task.index" sortable={false} htmlName="created by"/>
                                            <ThWithSortedIcons url="task.index" htmlName="status" queryParams={queryParams}/>
                                            <ThWithSortedIcons url="task.index" sortable={false} htmlName="actions" className="text-right"/>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                                    dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3">

                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.name}
                                                    placeholder="Task Name"
                                                    onBlur={e => searchFieldChange('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3">

                                            </th>
                                            <th className="px-3 py-3">

                                            </th>
                                            <th className="px-3 py-3">

                                            </th>
                                            <th className="px-3 py-3">

                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput
                                                    defaultValue={queryParams.status}
                                                    onChange={e => searchFieldChange('status', e.target.value)}
                                                >
                                                    <option value="Select Status">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>

                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3 text-right">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {tasks.data.map((task) => (
                                            <tr key={task.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-3 py-2">
                                                    <img style={{ width: 200 }} src={task.image_path} alt={task.name + " image"} />
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.description}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.created_at}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {task.due_date}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.createdBy.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span className={"px-2 py-1 rounded text-white text-nowrap " + MapStatusCss[task.status]}>
                                                        {task.status}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <Link href={route('task.edit', task.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link href={route('task.destroy', task.id)}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={tasks.meta.links}></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
