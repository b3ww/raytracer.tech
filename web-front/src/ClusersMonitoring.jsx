import clsx from "clsx";

const Clusters = ({ clusters, formik }) => (
    <div className="gap-4 grid grid-cols-1 overflow-y-auto p-4">
        {clusters.map((data) => (
            <div className="w-full bg-transparent rounded-md relative h-10 border-4">
                <div
                    className={clsx(
                        "absolute left-0 rounded-sm bottom-0 bordered-2 h-1/4 bg-green-400",
                        'z-10',
                        'text-transparent'
                    )}
                    style={{'width': `${data.value * 100}%`}}
                >a</div>
                <p>Cluster {data.id}</p>
            </div>
))}
    </div >
)

export default Clusters;
