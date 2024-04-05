from dotenv import load_dotenv
import os

load_dotenv()


def env_vars(request):
    return {
        "ALCHEMY_URL": os.getenv("ALCHEMY_URL"),
        "WALLET_PRIVATE_KEY": os.getenv("WALLET_PRIVATE_KEY"),
        "WALLET_PUBLIC_KEY": os.getenv("WALLET_PUBLIC_KEY"),
    }
