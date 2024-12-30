export default function OrderPage(){
    const ordesTable = {
        apresentacaoMusical: 2706.53,
        cafeLitro: 4.29,
        cerveja: 22.37,
        churrasco: 67.76,
        coffI: 13.27,
        coffII: 16.47,
        coffIII: 17.95,
        desjejum: 20.11,
        desjejumAcampamento: 29.77,
        evento: 83.23,
        lancheEspecial: 37.96,
        lancheTurno: 12.02,
        picole: 4.05,
        refeicao: 21.45
      };
      

    return <main className="grid place-items-center h-screen">
        <div className="border p-2 flex flex-col items-center">
            <h2>Novo Pedido</h2>
            <form className="flex flex-col gap-1">
                <input className="border w-full" id="name" placeholder="Ex.: Kenned Ferreira"/>
                <div className="flex g-1 border">
                    <select className="grow">
                        <option value="APRESENTACAO MUSICAL">APRESENTAÇÃO MUSICAL</option>
                        <option value="CAFÉ LITRO">CAFÉ LITRO</option>
                        <option value="CERVEJA">CERVEJA</option>
                        <option value="CHURRASCO">CHURRASCO</option>
                        <option value="COFF I">COFF I</option>
                        <option value="COFF II">COFF II</option>
                        <option value="COFF III">COFF III</option>
                        <option value="DESJEJUM">DESJEJUM</option>
                        <option value="DESJEJUM ACAMPAMENTO">DESJEJUM ACAMPAMENTO</option>
                        <option value="EVENTO">EVENTO</option>
                        <option value="LANCHE ESPECIAL">LANCHE ESPECIAL</option>
                        <option value="LANCHE TURNO">LANCHE TURNO</option>
                        <option value="PICOLE">PICOLE</option>
                        <option value="JANTAR">JANTAR</option>
                        <option value="ALMOCO">ALMOCO</option>
                    </select>
                    <input className="grow-0" type="number" id="quantity" name="quantity" placeholder="Ex.: 10" />
                </div>
                <input className="w-full border" id="cost-center" name="cost-center" placeholder="Ex.: RH, BARRAGEM" />
                <textarea placeholder="Ex.: Enviar limões para o churrasco" className="border"/>
                <button className="border" type="submit">Cadastrar Pedido</button>
            </form>
        </div>
    </main>
}