const handleRequest = async (apiCall) => {
    try {
        const res = await apiCall();
        return res.data;
    } catch (err){
        return rejectWithValue(err);
    }
};