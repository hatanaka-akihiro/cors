import Apis from './workflow_apis.js';

qbpms.form.on('ready', () => {
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
	    
    const result = await Apis.listProcessInstances(username, password, criteria, 0, 10);
	    
    for (let i = 0; i < result.processInstances.length; i++) {
      const pi = result.processInstances[i];
      const pid = pi.processInstanceId;
      const success = await Apis.stopProcessInstance(username, password, pid);
		    
      let log = qbpms.form.get('q_log');
      log += `${pid}: ${success}\n`;
      qbpms.form.set('q_log', log);
    }
  };
    
  const button = document.querySelector('#user_button');
  button.addEventListener('click', onClick);
});
