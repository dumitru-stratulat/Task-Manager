import React, { useRef, useState } from 'react';
import axios from 'axios';

import { useQuery, useMutation, queryCache } from 'react-query';
import { useInfiniteQuery } from 'react-query';

import TaskList from '../TaskList/TaskList';

import './TaskLists.css';

const TaskLists = () => {
	const [ page_id, setPageID ] = useState(1);
	const [ hasMore, setHasMore ] = useState(true);

	let axiosConfig = {
		headers:
			{
				Authorization: `Basic YWRtaW46cXdlMTIz`
			}
	};

	const fetchTaskLists = async () => {
		console.log(page_id, 'is');
		try {
			const res = await axios.get(
				`http://46.101.172.171:8008/project/task_list_view_by_project/87/${page_id}/`,
				axiosConfig
			);
			setPageID((old) => old + 1);
			return res.data;
		} catch (err) {
			console.log('Error: no more task lists to load');
			setHasMore(false);
		}
	};

	// can fetch more, optimization, bug with page_id
	const { data: lists, isFetching, isFetchingMore, fetchMore } = useInfiniteQuery('task-lists', fetchTaskLists, {
		getFetchMore:
			() => {
				return page_id;
			}
	});

	console.log('lists', lists);

	const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null);

	if (!lists) return <h5>loading</h5>;

	return (
		<div>
			{lists &&
				lists.map((lists_page: any) => {
					return (
						lists_page &&
						lists_page.map((taskList: any) => (
							<TaskList
								name={taskList.name}
								id={taskList.id}
								task_count={taskList.task_count}
								description={taskList.description}
								key={taskList.id}
							/>
						))
					);
				})}
			<div className='btn-container'>
				<button
					ref={loadMoreButtonRef}
					onClick={() => {
						fetchMore();
					}}
					disabled={!hasMore || isFetching}
					className={
						'btn load-more-lists ' +
						(
							!hasMore || isFetchingMore ? 'disabledBtn' :
							'')
					}
				>
					{
						isFetchingMore ? 'Loading more...' :
						hasMore ? 'Load More' :
						'Nothing more to load'}
				</button>
			</div>
		</div>
	);
};

export default TaskLists;
