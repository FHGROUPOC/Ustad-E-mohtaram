"use client";
import Tabs from "@/components/common/TabsServer";

export default function Section4Interactive() {
    return (
        <Tabs
            tabs={[
                {
                    id: "tab1",
                    title: "Work Experience",
                    content: (
                        <div className="d-flex flex-wrap gap-2">
                            <div className="block-experience p-4 rounded-16 border-200 flex-fill bg-white">
                                <span className="date p-2 rounded-pill bg-100 fs-8 fw-medium text-dark">2012 - 2014</span>
                                <h6 className="mb-0 mt-4">Junior UI Designer</h6>
                                <p className="text-dark fs-7 my-2">Web Solutions team</p>
                            </div>
                            <div className="block-experience p-4 rounded-16 border-200 flex-fill bg-white">
                                <span className="date p-2 rounded-pill bg-100 fs-8 fw-medium text-dark">2014-2016</span>
                                <h6 className="mb-0 mt-4">UI/UX Designer</h6>
                                <p className="text-dark fs-7 my-2">Self-Employed</p>
                            </div>
                            <div className="block-experience p-4 rounded-16 border-200 flex-fill bg-white">
                                <span className="date p-2 rounded-pill bg-100 fs-8 fw-medium text-dark">2016 - 2019</span>
                                <h6 className="mb-0 mt-4">UI/UX Designer</h6>
                                <p className="text-dark fs-7 my-2">Tech Startup</p>
                            </div>
                            <div className="block-experience p-4 rounded-16 border-200 flex-fill bg-white">
                                <span className="date p-2 rounded-pill bg-100 fs-8 fw-medium text-dark">2019 - Present</span>
                                <h6 className="mb-0 mt-4">Senior UI/UX Designer</h6>
                                <p className="text-dark fs-7 my-2">Leader in Creative team</p>
                            </div>
                        </div>
                    ),
                },
                {
                    id: "tab2",
                    title: "Education",
                    content: (
                        <div className="d-flex flex-wrap gap-2">
                            <div className="block-experience p-4 rounded-16 border-200 flex-fill bg-white">
                                <span className="date p-2 rounded-pill bg-100 fs-8 fw-medium text-dark">2012 - 2014</span>
                                <h6 className="mb-0 mt-4">Junior UI Designer</h6>
                                <p className="text-dark fs-7 my-2">Leader in Creative team</p>
                            </div>
                            <div className="block-experience p-4 rounded-16 border-200 flex-fill bg-white">
                                <span className="date p-2 rounded-pill bg-100 fs-8 fw-medium text-dark">2014-2016</span>
                                <h6 className="mb-0 mt-4">UI/UX Designer</h6>
                                <p className="text-dark fs-7 my-2">Self-Employed</p>
                            </div>
                            <div className="block-experience p-4 rounded-16 border-200 flex-fill bg-white">
                                <span className="date p-2 rounded-pill bg-100 fs-8 fw-medium text-dark">2016 - 2019</span>
                                <h6 className="mb-0 mt-4">UI/UX Designer</h6>
                                <p className="text-dark fs-7 my-2">Web Solutions team</p>
                            </div>
                            <div className="block-experience p-4 rounded-16 border-200 flex-fill bg-white">
                                <span className="date p-2 rounded-pill bg-100 fs-8 fw-medium text-dark">2019 - Present</span>
                                <h6 className="mb-0 mt-4">Senior UI/UX Designer</h6>
                                <p className="text-dark fs-7 my-2">Self-Employed</p>
                            </div>
                        </div>
                    ),
                },
            ]}
        />
    );
}
