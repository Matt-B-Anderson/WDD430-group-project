"use client";

export default function DeleteProductModal({ product, sellerId, onClose, onDeleted }: any) {
    async function handleDelete() {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ seller_id: sellerId }), // authorization check
            }
        );

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Failed to delete product");
            return;
        }

        onDeleted();
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-xl w-full max-w-md shadow-xl">

                <h2 className="text-2xl font-serif font-bold mb-4 text-red-600">
                    Delete Product
                </h2>

                <p className="mb-6 text-[var(--foreground)]">
                    Are you sure you want to delete <strong>{product.title}</strong>?  
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-[var(--foreground)]"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
}
