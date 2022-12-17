import useTitle from '../../hooks/useTitle'
import AccountList from './AccountList'
import Filter from './Filter'

const AccountLayout = () => {
    useTitle('Account')

    return (
        <>
            <section className="px-4 py-3">
                <Filter />
                <AccountList />
            </section>
        </>
    )
}

export default AccountLayout
