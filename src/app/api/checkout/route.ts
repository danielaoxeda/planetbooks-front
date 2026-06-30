import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const items = body.items as {
            itemKey: string;
            itemTitle: string;
            itemPrice: number;
            quantity: number;
        }[];

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "El carrito está vacío" },
                { status: 400 }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        console.log("baseUrl:", baseUrl);
        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: items.map((item) => ({
                    id: item.itemKey,
                    title: item.itemTitle,
                    unit_price: item.itemPrice,
                    quantity: item.quantity,
                    currency_id: "PEN",
                })),
                back_urls: {
                    success: `${baseUrl}/checkout/success`,
                    failure: `${baseUrl}/checkout/failure`,
                    pending: `${baseUrl}/checkout/pending`,
                },
                auto_return: "approved",
            },
        });

        return NextResponse.json({
            initPoint: result.init_point,
        });
    } catch (error) {
        console.error("Error creating MercadoPago preference:", error);
        return NextResponse.json(
            { error: "No se pudo crear la preferencia de pago" },
            { status: 500 }
        );
    }
}