// InsertJokboComponent.js
import axios from 'axios';

const InsertJokboComponent = () => {
    const insertJokbo = async (jokboData) => {
        try {
            const response = await axios.post('http://localhost:5000/db/write', jokboData);
            if (response.data.success) {
                console.log('족보가 성공적으로 추가되었습니다!', response.data);
                return { success: true, data: response.data };
            } else {
                console.error('족보 추가 실패:', response.data.error);
                return { success: false, error: response.data.error };
            }
        } catch (error) {
            console.error('족보 추가 중 오류 발생:', error);
            return { success: false, error: '서버 오류가 발생했습니다.' };
        }
    };

    return { insertJokbo };
};

export default InsertJokboComponent;