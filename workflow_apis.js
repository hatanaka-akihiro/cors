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

export default {
  stopProcessInstance
};
