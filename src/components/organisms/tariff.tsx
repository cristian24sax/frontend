import React, { useEffect } from "react";

interface IziPayRequest {
  requestSource: string;
  merchantCode: string;
  orderNumber: string;
  publicKey: string;
  amount: string;
}

const PlanesModule = ({ onClose }: { onClose: () => void }) => {
  const dataUser = localStorage.getItem("dataUser");
  const { token } = JSON.parse(dataUser as string);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sandbox-checkout.izipay.pe/payments/v1/js/index.js';
    script.async = true;
    script.onload = () => {
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function izipay(amount: any) {

    const currentTimeUnix = Math.floor(Date.now()) * 1000;
    const transactionId = currentTimeUnix.toString().slice(0, 14);
    const orderNumber = currentTimeUnix.toString().slice(0, 10).toString();
    const ORDER_AMOUNT = amount;
    const ORDER_CURRENCY = 'PEN';
    const MERCHANT_CODE = '4001834';
    const requestSource = 'ECOMMERCE';
    const PUBLIC_KEY = 'VErethUtraQuxas57wuMuquprADrAHAb';

    const requestData: IziPayRequest = {
      requestSource: requestSource,
      merchantCode: MERCHANT_CODE,
      orderNumber: orderNumber,
      publicKey: PUBLIC_KEY,
      amount: amount
    };


    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/izipay/generate/token/${transactionId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const tokenIziPay = await response.json();

    if (!response.ok) {
      alert("fallo");
      return;
    }

    const iziConfig = {
      config: {
        transactionId: transactionId,
        action: Izipay.enums.payActions.PAY,
        merchantCode: MERCHANT_CODE,
        order: {
          orderNumber: orderNumber,
          currency: ORDER_CURRENCY,
          amount: ORDER_AMOUNT,
          processType: Izipay.enums.processType.AUTHORIZATION,
          merchantBuyerId: 'mc1768',
          dateTimeTransaction: '1670258741603000', //currentTimeUnix
          payMethod: Izipay.enums.showMethods.ALL, //
        },
        billing: {
          firstName: 'Juan',
          lastName: 'Wick',
          email: 'jwick@izipay.pe',
          phoneNumber: '989339999',
          street: 'calle el demo',
          city: 'lima',
          state: 'lima',
          country: 'PE',
          postalCode: '00001',
          document: '12345678',
          documentType: Izipay.enums.documentType.DNI,
        },
        render: {
          typeForm: Izipay.enums.typeForm.POP_UP,
          container: '#your-iframe-payment',
          showButtonProcessForm: false,
        },
        urlRedirect: 'https://server.punto-web.com/comercio/creceivedemo.asp?p=h1',
        appearance: {
          logo: 'https://logowik.com/content/uploads/images/shopping-cart5929.jpg',
        }
      },
    };

    const checkout = new Izipay({ config: iziConfig?.config });

    checkout?.LoadForm({
      authorization: tokenIziPay.data.token,
      keyRSA: 'RSA',
      callbackResponse: (response: any) => {
        if (response.code == "00") {
          onClose();
        }
      },
    });

  }



  return (
    <div className="relative container mx-auto p-6 bg-white rounded shadow-lg">
      <button
        className="absolute top-2 right-12 bg-blue-950 text-white px-3 py-1 rounded hover:bg-blue-900"
        onClick={() => console.log('Botón adicional presionado')}
      >
        Sugerir curso nuevo
      </button>
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        onClick={onClose}
        aria-label="Cerrar"
      >
        ✖
      </button>

      <h1 className="text-center text-2xl font-bold mb-4">Módulo Planes</h1>
      <p className="text-center text-lg mb-6">Cada mes se subirán 2 cursos nuevos</p>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr>
              <th className="border border-gray-300 p-4">Detalles</th>
              <th className="border border-gray-300 p-4 bg-orange-200">
                COBRE <br />
                <span>(30 soles/mes)</span><br />
                <button
                  className="mt-2 px-4 py-2 bg-black text-white rounded"
                  onClick={() =>
                    izipay("30.00")
                  }
                >
                  Comprar
                </button>
              </th>
              <th className="border border-gray-300 p-4 bg-gray-200">
                PLATA <br />
                <span>(70 soles/mes)</span><br />
                <button
                  className="mt-2 px-4 py-2 bg-black text-white rounded"
                  onClick={() =>
                    izipay("70.00")
                  }
                >
                  Comprar
                </button>
              </th>
              <th className="border border-gray-300 p-4 bg-yellow-300">
                ORO <br />
                <span>(100 soles/mes)</span><br />
                <button
                  className="mt-2 px-4 py-2 bg-black text-white rounded"
                  onClick={() =>
                    izipay("100.00")
                  }
                >
                  Comprar
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-4">Acceso a todos los cursos</td>
              <td className="border border-gray-300 p-4">✔️</td>
              <td className="border border-gray-300 p-4">✔️</td>
              <td className="border border-gray-300 p-4">✔️</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4">Acceso a consultas con especialista</td>
              <td className="border border-gray-300 p-4">✔️</td>
              <td className="border border-gray-300 p-4">✔️</td>
              <td className="border border-gray-300 p-4">✔️</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4">Acceso a comprar prácticas profesionales</td>
              <td className="border border-gray-300 p-4">✔️</td>
              <td className="border border-gray-300 p-4">✔️</td>
              <td className="border border-gray-300 p-4">✔️</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4">Descarga de presentaciones (PPTs)</td>
              <td className="border border-gray-300 p-4">❌</td>
              <td className="border border-gray-300 p-4">✔️</td>
              <td className="border border-gray-300 p-4">✔️</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4">Constancias de participación</td>
              <td className="border border-gray-300 p-4">✔️</td>
              <td className="border border-gray-300 p-4">✔️</td>
              <td className="border border-gray-300 p-4">✔️</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4">El usuario lo puedes usar en:</td>
              <td className="border border-gray-300 p-4">
                1 dispositivo <br />
                No se puede compartir
              </td>
              <td className="border border-gray-300 p-4">
                3 dispositivos <br />
                Compartir usuario
              </td>
              <td className="border border-gray-300 p-4">
                5 dispositivos <br />
                Compartir usuario
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanesModule;
