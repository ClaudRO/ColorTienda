from django import template




register = template.Library()

@register.filter
def sum_total(cart_items, key):
    """
    Calcula la suma total basada en una clave (e.g., 'price' o 'quantity').
    """
    return sum(item.get(key, 0) for item in cart_items)  # Usa get para manejar casos donde no exista la clave

@register.filter
def multiply(value, arg):
    try:
        return value * arg
    except TypeError:
        return 0  # Manejar errores de tipo si los valores no son numéricos
    
@register.filter
def sum_total(cart_items, key):
    """
    Calcula la suma total basada en una clave.
    """
    return sum(item[key] for item in cart_items if key in item)