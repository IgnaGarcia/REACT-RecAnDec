import React, { useContext} from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { getCommand } from '../../../api/CommandsService'
import { ConfigurationTemplate } from '../ConfigurationTemplate'
import { CommandModal } from './CommandModal'
import { TelegramRow } from './TelegramRow'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { Chip } from '../../../components/Chip'

export const Telegram = () => {
  const { user } = useContext(UserContext)
  const { wallets } = useContext(ConfigContext)

  const tableHead = <tr>
    <th className='rounded-tl-xl'> Para Egresos </th>
    <th className='border-l border-back-500'> Categoria </th>
    <th className='border-l border-back-500'> Tags </th>
    <th className='border-l border-back-500'> Billetera </th>
    <th className='border-l border-back-500 rounded-tr-xl'> Acciones </th>
  </tr>

  const tableBody = (el, idx) => <TelegramRow el={el} idx={idx} />

  return (
    <>
      {user.telegramId[0] === '_'?
      <>
        <div className='w-10/12 px-4 mt-12 mb-4 mx-auto text-base'> 
            <h2 className='title-2'>Codigo de Sincronizacion: </h2>
            <div className='bg-back-200/75 rounded-lg py-4 px-12 m-auto w-min'>{user.telegramId}</div>
        </div>
        <div className='w-10/12 px-4 my-8 mx-auto text-base'>
          <h2 className='title-2 mb-4'>Como Sincronizarse?</h2>
          <ul>
            <li>1. Dentro de Telegram dirigirse al chat de <span className='text-primary-600'>@RecAnDec</span></li>
            <li>2. Ya en el chat escribir el comando <span className='text-primary-600'>/start 
              <span className='text-red-400'> [mail]</span> 
              <span className='text-green-500'> [codigo]</span>
            </span></li>
            <li className='mt-3 text-sm font-semibold'>Nota: deberas reemplazar 
              <span className='text-red-400'> [mail]</span> por tu mail, y
              <span className='text-green-500'> [codigo]</span> por tu codigo de sincronizacion(en tu caso 
              <span className='text-primary-600'> {user.telegramId}</span>)
            </li>
          </ul>
        </div>
      </>
       : ""
      }
      <div className='w-10/12 px-4 mt-8 mx-auto text-base'>
        <h2 className='title-2 mb-4'>Como Crear Registros en Telegram?</h2>
        <div className='mb-4'>
          Para crear un registro en telegram se debe seguir una cierta estructura para indicar las categorias, etiquetas y billeteras, a continuacion unos ejemplos:
        </div>
        <div className='mt-4 text-sm font-semibold'>
          Nota: primero siempre debe estar el monto, luego de este puede haber cualquier orden de etiquetas, billetera y categoria
        </div>

        <h3 className='title-3 mt-6 mb-4'>Egresos</h3>
        <div className='table-card'>
          <table className='table table-auto rounded-full min-w-full'>
            <thead className='text-back-300 bg-back-600 h-7 rounded-t-full'>
              <tr>
                <th className='rounded-tl-xl'>Tipo de Registro</th>
                <th className='border-l border-back-500'>Formato</th>
                <th className="border-l border-back-500 rounded-tr-xl">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr className='h-7'>
                <td>
                  <div className='flex justify-center items-center content-center flex-wrap'>
                    <Chip index={0} label={"Egreso con categoria"}/>
                  </div>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>[monto]</span>
                  <span className='text-green-600'> -[alias de categoria]</span>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>1500</span>
                  <span className='text-green-600'> -alim</span>
                </td>
              </tr>
              <tr className='h-7'>
                <td>
                  <div className='flex justify-center items-center content-center flex-wrap'>
                    <Chip index={1} label={"Egreso con billetera"}/>
                  </div>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>[monto]</span>
                  <span className='text-green-600'> -[alias de categoria]</span>
                  <span className='text-indigo-500'> $[alias de billetera]</span>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>3000</span>
                  <span className='text-green-600'> -alim</span>
                  <span className='text-indigo-500'> ${wallets.data.length? wallets.data[0].alias : "efectivo"}</span>
                </td>
              </tr>
              <tr className='h-7'>
                <td>
                  <div className='flex justify-center items-center content-center flex-wrap'>
                    <Chip index={2} label={"Egreso con etiquetas"}/>
                  </div>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>[monto]</span>
                  <span className='text-green-600'> -[alias de categoria]</span>
                  <span className='text-amber-500'> ([alias de etiqueta],...)</span>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>1300</span>
                  <span className='text-green-600'> -serv</span>
                  <span className='text-amber-500'> (recu,luz)</span>
                </td>
              </tr>
              <tr className='h-7'>
                <td>
                  <div className='flex justify-center items-center content-center flex-wrap'>
                    <Chip index={3} label={"Egreso completo"}/>
                  </div>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>[monto]</span>
                  <span className='text-green-600'> -[alias de categoria]</span>
                  <span className='text-indigo-500'> $[alias de billetera]</span>
                  <span className='text-amber-500'> ([alias de etiqueta],...)</span>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>2300</span>
                  <span className='text-green-600'> -serv</span>
                  <span className='text-indigo-500'> ${wallets.data.length? wallets.data[0].alias : "efectivo"}</span>
                  <span className='text-amber-500'> (recu,luz)</span>
                </td>
              </tr>
              <tr className='h-7'>
                <td>
                  <div className='flex justify-center items-center content-center flex-wrap'>
                    <Chip index={4} label={"Egreso con Comando"}/>
                  </div>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>*[monto]</span>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>*2300</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className='title-3 mt-6 mb-4'>Ingresos</h3>
        <div className='table-card'>
          <table className='table table-auto rounded-full min-w-full'>
            <thead className='text-back-300 bg-back-600 h-7 rounded-t-full'>
              <tr>
                <th className='rounded-tl-xl'>Tipo de Registro</th>
                <th className='border-l border-back-500'>Formato</th>
                <th className="border-l border-back-500 rounded-tr-xl">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr className='h-7'>
                <td>
                  <div className='flex justify-center items-center content-center flex-wrap'>
                    <Chip index={0} label={"Ingreso con categoria"}/>
                  </div>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>+[monto]</span>
                  <span className='text-green-600'> -[alias de categoria]</span>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>+15000</span>
                  <span className='text-green-600'> -venta</span>
                </td>
              </tr>
              <tr className='h-7'>
                <td>
                  <div className='flex justify-center items-center content-center flex-wrap'>
                    <Chip index={1} label={"Ingreso con billetera"}/>
                  </div>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>+[monto]</span>
                  <span className='text-green-600'> -[alias de categoria]</span>
                  <span className='text-indigo-500'> $[alias de billetera]</span>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>+90000</span>
                  <span className='text-green-600'> -sueldo</span>
                  <span className='text-indigo-500'> ${wallets.data.length? wallets.data[0].alias : "bbva"}</span>
                </td>
              </tr>
              <tr className='h-7'>
                <td>
                  <div className='flex justify-center items-center content-center flex-wrap'>
                    <Chip index={2} label={"Ingreso con etiquetas"}/>
                  </div>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>+[monto]</span>
                  <span className='text-green-600'> -[alias de categoria]</span>
                  <span className='text-amber-500'> ([alias de etiqueta],...)</span>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>+6000</span>
                  <span className='text-green-600'> -venta</span>
                  <span className='text-amber-500'> (ext)</span>
                </td>
              </tr>
              <tr className='h-7'>
                <td>
                  <div className='flex justify-center items-center content-center flex-wrap'>
                    <Chip index={3} label={"Ingreso completo"}/>
                  </div>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>+[monto]</span>
                  <span className='text-green-600'> -[alias de categoria]</span>
                  <span className='text-indigo-500'> $[alias de billetera]</span>
                  <span className='text-amber-500'> ([alias de etiqueta],...)</span>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>+2300</span>
                  <span className='text-green-600'> -venta</span>
                  <span className='text-indigo-500'> ${wallets.data.length? wallets.data[0].alias : "efectivo"}</span>
                  <span className='text-amber-500'> (recu)</span>
                </td>
              </tr>
              <tr className='h-7'>
                <td>
                  <div className='flex justify-center items-center content-center flex-wrap'>
                    <Chip index={4} label={"Ingreso con Comando"}/>
                  </div>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>*+[monto]</span>
                </td>
                <td className='border-l'>
                  <span className='text-red-500'>*+2300</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ConfigurationTemplate CreateModal={CommandModal}  tableHead={tableHead} tableBody={tableBody} get={getCommand}
        title={"Comandos"} createTitle={"Nuevo Comando"}/>
    </>
  )
}