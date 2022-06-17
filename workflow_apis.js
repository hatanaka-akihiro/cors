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

export default {
  stopProcessInstance,
  listProcessInstances
};
