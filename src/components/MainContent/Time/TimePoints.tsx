import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { getTimePoints } from './queries'
import moment from 'moment';

const TimePoints: React.FC<{ id: number }> = ({ id }) => {
    const { status, data, error } = useQuery(['time points', id.toString()], getTimePoints);

    if (status === 'loading') return <div data-testid="loading">loading</div>;
    if (status === 'error') return <div>error!{JSON.stringify(error)}</div>;

    return (
        <>
            {data && data.map((timePoint: any, key: any) => {
                return (
                    <div className="tableContentWrap">
                        <div className="tableContent">
                            <div className="timeDescription">
                                <p>{timePoint.description}</p>
                            </div>
                            <div className="timeTaskList">
                                <p>{timePoint.task_list}</p>
                            </div>
                            <div className="timeEndDate">
                                <p>{moment.parseZone(timePoint.time_endmoment).format('MMMM Do YYYY, h:mm a')}</p>
                            </div>
                            <div className="timeStartDate">
                                <p>{moment.parseZone(timePoint.time_start).format('MMMM Do YYYY, h:mm a')}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    );
};

export default TimePoints;
