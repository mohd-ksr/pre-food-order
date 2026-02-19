from fastapi.middleware.cors import CORSMiddleware

def setup_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["https://pre-food-order.netlify.app","https://pre-food-order-admin.netlify.app"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
