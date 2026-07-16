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
                { error: "The cart is empty." },
                { status: 400 }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        console.log("baseUrl:", baseUrl);
        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: "detalle",
                        title: items.map(i => `${i.itemTitle} x${i.quantity}`).join(" | "),
                        unit_price: items.reduce((acc, i) => acc + i.itemPrice * i.quantity, 0),
                        quantity: 1,
                        currency_id: "USD",
                    }
                ],
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
            { error: "The payment preference could not be created" },
            { status: 500 }
        );
    }
}