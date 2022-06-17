const user_onReady = () => {
	const stopProcessInstance = async (username, password, pid) => {
		const response = await fetch(`/API/OR/ProcessInstance/stop?processInstanceId=${pid}`, {
			method: 'POST',
			credentials: 'omit',
			headers: new Headers({
				Authorization: 'Basic ' + btoa(username + ':' + password)
			})
		});
		return response.ok;
	};
	
	const listProcessInstances = async (username, password, criteriaObj, start, limit) => {
		const params = new URLSearchParams();
  		params.append('criteria', JSON.stringify(criteriaObj));
  		params.append('start', start);
  		params.append('limit', limit);
  		const response = await fetch(`/API/OR/ProcessInstance/list?${params.toString()}`, {
    			credentials: 'omit',
    			headers: new Headers({
      				Authorization: 'Basic ' + btoa(username + ':' + password)
    			})
  		});
		return response.json();
	};
	
	const onClick = async () => {
		const username = qbpms.form.get('q_username');
		const password = qbpms.form.get('q_password');
		const pmiid = qbpms.form.get('q_pmiid');

		const criteria = {
      			processModelInfoId: pmiid,
      			processInstanceState: ['STARTED'],
      			sortProperty: 'processInstanceStartDatetime',
      			sortDirection: 'ASC'
    		};
	    
		const result = await Apis.listProcessInstances(username, password, criteria, 0, 1000);

		for (let i = 0; i < result.processInstances.length; i++) {
			const pi = result.processInstances[i];
			const pid = pi.processInstanceId;
			const success = await Apis.stopProcessInstance(username, password, pid);
			
			let log = qbpms.form.get('q_log');
			log += `${pid}: ${success}\n`;
			qbpms.form.set('q_log', log);
			qbpms.form.set('q_progress', `${i + 1} / ${result.processInstances.length}`);
		}
	};
    
	const button = document.querySelector('#user_button');
	button.addEventListener('click', onClick);
};

qbpms.form.on('ready', user_onReady);
