import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import { RentalWithSummary } from "@/types/props";
import { Eye, Pencil, Trash } from "lucide-react";

interface RentalsListProps {
  rentals: RentalWithSummary[];
}

export function RentalsList({ rentals }: RentalsListProps) {
  if (rentals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum aluguel encontrado</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 font-medium text-gray-500">
              Inquilino
            </th>
            <th className="text-left p-4 font-medium text-gray-500">Imóvel</th>
            <th className="text-left p-4 font-medium text-gray-500">Valor</th>
            <th className="text-left p-4 font-medium text-gray-500">
              Vencimento
            </th>
            <th className="text-left p-4 font-medium text-gray-500">Status</th>
            <th className="p-4 font-medium text-gray-500"></th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div>
                  <p className="font-medium text-gray-900">
                    {rental.renter.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {rental.renter.document}
                  </p>
                </div>
              </td>
              <td className="p-4">
                <div>
                  <p className="font-medium text-gray-900">
                    {rental.property.identifier}
                  </p>
                  <p className="text-sm text-gray-500">
                    {rental.property.address}
                  </p>
                </div>
              </td>
              <td className="p-4">
                <p className="font-medium text-gray-900">
                  {formatCurrency(rental.price)}
                </p>
                <p className="text-sm text-gray-500">Dia {rental.dueDay}</p>
              </td>
              <td className="p-4">
                <div>
                  <p className="text-gray-900">
                    {formatDate(rental.startDate)} até{" "}
                    {rental.endDate ? formatDate(rental.endDate) : "N/D"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {rental._count.charges} cobranças
                  </p>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      rental.charges.length > 0 ? "bg-red-400" : "bg-green-400"
                    }`}
                  />
                  <span className="text-sm text-gray-700">
                    {rental.charges.length > 0
                      ? `${rental.charges.length} ${
                          rental.charges.length > 1 ? "atrasados" : "atrasado"
                        }`
                      : "Em dia"}
                  </span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center w-[100px] md:w-[300px] gap-2 flex-col md:flex-row">
                  <button
                    title="Ver detalhes do aluguel"
                    // onClick={() => {
                    /* Implementar navegação para detalhes */
                    // }}
                    className="text-sm flex items-center justify-start bg-blue-600 border-blue-600 p-2 rounded-md text-white hover:bg-blue-800"
                  >
                    <Eye size={18} className="mr-1" />
                    Detalhes
                  </button>
                  <button
                    title="Editar Aluguel"
                    // onClick={() => {
                    /* Implementar navegação para detalhes */
                    // }}
                    className="text-sm flex items-center justify-start bg-orange-600 border-orange-600 p-2 rounded-md text-white hover:bg-orange-800"
                  >
                    <Pencil size={18} className="mr-1" />
                    Editar
                  </button>
                  <button
                    title="Excluir Aluguel"
                    // onClick={() => {
                    /* Implementar navegação para detalhes */
                    // }}
                    className="text-sm flex items-center justify-start bg-red-600 border-red-600 p-2 rounded-md text-white hover:bg-red-800"
                  >
                    <Trash size={18} className="mr-1" />
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
