export const payment = async (service, phone = '237400001020',) => {
    const url = 'https://mesomb.hachther.com/api/v1.0/payment/online/'
    const body = {
        service,
        amount: 200,
        payer: phone,
        reference: 'PHS_CLIENT',
        fees: true,
        message: 'test123'
    }
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-MeSomb-Application': '3fe32126bb48277b99f9aa5b8ce72e3f017d1e59'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(body)
        });
        const res = await response.json();
        console.log(res)
        return res
    } catch (e) {
        console.log(e)
    }
}