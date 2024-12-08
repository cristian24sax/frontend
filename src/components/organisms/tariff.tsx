import React from "react";

const PlanesModule = ({ onClose }: { onClose: () => void }) => {
  const dataUser = localStorage.getItem("dataUser");
  const { token } = JSON.parse(dataUser as string);
  async function izipay(request: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/izipay/generate/token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const responseAPI = await response.json();
    console.log(responseAPI, "respuesta");
    //  objeto que devuelve     {
    //     "succeeded": true,
    //     "message": "",
    //     "errors": [],
    //     "data": {
    //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudENvZGUiOiI0MDAxODM0IiwiZmFjaWxpdGF0b3JDb2RlIjoiMCIsInRyYW5zYWN0aW9uSWQiOiIxNzMzNjYxMDA5NjkyMCIsIk9yZGVyTnVtYmVyIjoiMTczMzY2MTAwOSIsIkFtb3VudCI6IjEuOTkiLCJUb2tlbklkIjoiYTkwZDU2ZWYtMGZlYy00MmMwLTk2Y2UtZjY1M2ZjY2EyZWUyIiwibmJmIjoxNzMzNjYxMDEwLCJleHAiOjE3MzM2NjE5MTAsImlhdCI6MTczMzY2MTAxMH0.FIZNgZlCnE_bPdshvQvpn6c7MXrojVqnq3PBzRKSpm8"
    //     }
    // }
    if (!response.ok) {
      alert("fallo");
      return;
    }
  }

  return (
    <div className="relative container mx-auto p-6 bg-white rounded shadow-lg">
      <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose} aria-label="Cerrar">
        ✖
      </button>
      <h1 className="text-center text-2xl font-bold mb-4">Módulo Planes (ajustable)</h1>
      <p className="text-center text-lg mb-6">Todas las semanas se subirán dos cursos nuevos</p>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr>
              {/* te dejo en cada onclick el objeto para que puedas cambiarlo para cada tipo de supcripcion */}
              <th className="border border-gray-300 p-4">Detalles</th>
              <th className="border border-gray-300 p-4 bg-orange-200">
                COBRE <br />
                <span>(30 soles/mes)</span>
                <button
                  className="mt-2 px-4 py-2 bg-black text-white rounded"
                  onClick={() =>
                    izipay({
                      requestSource: "ECOMMERCE",
                      merchantCode: "4001834",
                      publicKey: "VErethUtraQuxas57wuMuquprADrAHAb",
                      amount: "1.99",
                    })
                  }
                >
                  Comprar
                </button>
              </th>
              <th className="border border-gray-300 p-4 bg-gray-200">
                PLATA <br />
                <span>(70 soles/mes)</span>
                <button
                  className="mt-2 px-4 py-2 bg-black text-white rounded"
                  onClick={() =>
                    izipay({
                      requestSource: "ECOMMERCE",
                      merchantCode: "4001834",
                      publicKey: "VErethUtraQuxas57wuMuquprADrAHAb",
                      amount: "2.99",
                    })
                  }
                >
                  Comprar
                </button>
              </th>
              <th className="border border-gray-300 p-4 bg-yellow-300">
                ORO <br />
                <span>(100 soles/mes)</span>
                <button
                  className="mt-2 px-4 py-2 bg-black text-white rounded"
                  onClick={() =>
                    izipay({
                      requestSource: "ECOMMERCE",
                      merchantCode: "4001834",
                      publicKey: "VErethUtraQuxas57wuMuquprADrAHAb",
                      amount: "3.99",
                    })
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
