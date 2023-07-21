import { useSearchParams } from 'react-router-dom';

export default function NonneMemberMobileOrderComplete() {
    const [searchParams] = useSearchParams();
    const imp_uid = searchParams.get('imp_uid');
    const imp_success = searchParams.get('imp_success');
    const error_code = searchParams.get('error_code');
    const error_msg = searchParams.get('error_msg');



    return <div>hello</div>
}